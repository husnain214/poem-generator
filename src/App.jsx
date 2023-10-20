import { useState } from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import poemService from './services/poemService'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [poem, setPoem] = useState('')
  const [keywords, setKeywords] = useState('')
  const [numOfTokens, setNumTokens] = useState(0)
  const [tone, setTone] = useState('')
  const [era, setEra] = useState('')

  const generatePoem = async event => {
    event.preventDefault()
    setPoem('')
    setLoading(true)
    const preference = {
      keywords,
      poem, 
      numOfTokens, 
      tone, 
      era,
    }

    try {
      const generatedText = await poemService.createPoem(preference)
      setPoem(generatedText)
    } catch (error) {
      throw new Error(error)
    }

    setLoading(false)
    setKeywords('')
    setTone('')
    setNumTokens('')
    setEra('')
  }

  return (
    <div className='grid grid-cols-2 items-center min-h-screen justify-between gap-x-10 max-w-5xl mx-auto pt-10'>
      <form className='grid gap-3' action='' method='post' onSubmit={generatePoem}>
        <h1 className='text-center text-2xl font-bold mb-10'>Poem Generator</h1>

        <label className='grid gap-3'>
          Keywords
          <input
            type='text' 
            className='border border-blue-gray-200 rounded-sm py-1 px-2'
            value={keywords} 
            onChange={({ target }) => setKeywords(target.value)}
          />
        </label>

        <label className='grid gap-3'>
          Number of Words
          <input
            type='number' 
            className='border border-blue-gray-200 rounded-sm py-1 px-2'
            value={numOfTokens} 
            onChange={({ target }) => setNumTokens(target.value)}
          />
        </label>
        <label className='grid gap-3'>
          Tone
          <input
            type='text' 
            className='border border-blue-gray-200 rounded-sm py-1 px-2'
            value={tone} 
            onChange={({ target }) => setTone(target.value)}
          />
        </label>
        <div className='grid gap-3'>
          Era
          
          <select onChange={({ target }) => setEra(target.value)} value={era} name="era" id="era" className='border border-blue-gray-200 rounded-sm py-1 px-2'>
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </div>

        <button type='submit' className='bg-red-500 rounded-lg py-2 text-gray-100 hover:bg-red-400 transition-all'>Submit</button>
      </form>

      { !poem && <InfinitySpin width={loading ? '100': '0'} color="rgb(239, 68, 68)" /> }
      { poem && <div className='mt-5 whitespace-pre-wrap text-xl text-black'>{poem}</div> }
    </div>
  )
}

export default App