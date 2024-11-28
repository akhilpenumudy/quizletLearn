import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const { rawText } = await req.json()

    if (!rawText) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-002" })

    const prompt = `
    Help organize this educational content into a structured format.
    Create a table with these columns: Question, Choice A, Choice B, Choice C, Choice D, and Answer.
    
    Guidelines:
    1. Organize the content clearly
    2. Ensure each row has a question and 4 choices
    3. Mark the correct answer with a single letter (A, B, C, or D)
    4. If needed, generate additional reasonable options to have 4 choices
    5. Focus on clear organization without changing the core content
    
    Format using pipe separators (|) like this:
    Question|Choice A|Choice B|Choice C|Choice D|Answer
    
    Content to organize:
    ${rawText}
    `

    // Use streaming
    const result = await model.generateContentStream(prompt)
    
    let fullText = ''
    for await (const chunk of result.stream) {
      const chunkText = chunk.text()
      fullText += chunkText
    }

    console.log('AI Response:', fullText)

    if (!fullText) {
      return NextResponse.json(
        { error: 'No response from AI model' },
        { status: 500 }
      )
    }

    // Parse the pipe-separated data and filter out header/separator rows
    const rows = fullText
      .trim()
      .split('\n')
      .filter(row => {
        // Skip empty rows
        if (!row.includes('|')) return false;
        
        // Skip header row
        if (row.toLowerCase().includes('question|choice')) return false;
        
        // Skip separator rows (rows with only dashes or underscores)
        if (row.replace(/[-_|]/g, '').trim() === '') return false;
        
        return true;
      });
    
    console.log('Parsed rows:', rows)

    if (rows.length < 1) {
      return NextResponse.json(
        { error: 'Invalid response format from AI - no valid rows' },
        { status: 500 }
      )
    }

    const headers = ['Question', 'Choice A', 'Choice B', 'Choice C', 'Choice D', 'Answer']
    
    const data = rows.map(row => {
      const values = row.split('|').map(val => val.trim())
      
      // Ensure we have exactly 6 values
      while (values.length < 6) values.push('')
      if (values.length > 6) values.length = 6

      const obj: {[key: string]: string} = {}
      headers.forEach((header, index) => {
        obj[header] = values[index] || ''
      })
      
      // Ensure answer is a single capital letter
      if (obj['Answer']) {
        obj['Answer'] = obj['Answer'].toUpperCase().charAt(0)
        if (!['A', 'B', 'C', 'D'].includes(obj['Answer'])) {
          obj['Answer'] = 'A' // Default to A if invalid
        }
      }
      return obj
    })

    if (data.length === 0) {
      return NextResponse.json(
        { error: 'No questions were parsed from the input' },
        { status: 400 }
      )
    }

    console.log('Formatted data:', data)

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Error details:', error)
    return NextResponse.json(
      { 
        error: error.message || 'An error occurred while processing the request',
        details: error.toString()
      },
      { status: 500 }
    )
  }
}

