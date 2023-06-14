import React, { useState } from 'react'
import './App.css'
import './index.css'

type Synonym ={
    word: string;
    score: number;
}

const API_URL = import.meta.env.VITE_API_URL ?? `https://api.datamuse.com`

function App2() {
    const [word, setWord] = useState("")
    const [Synonyms, setSynonyms] = useState<Synonym[]>([])

    const fetchWord = (word: string) => {
        fetch(`${API_URL}/words?rel_syn=${word}`)
        .then((Response) => Response.json())
        .then(setSynonyms);
    }

    const handleFetchSynonyms = (e: React.FormEvent) => {
        e.preventDefault();
        fetchWord(word);
        // fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
        //.then((Response) => Response.json())
        //.then(setSynonyms);
    }

    const handleSynonymClicked = (e: any) => {
        setWord(e);
        fetchWord(e);
    }

    return (
    <div>

        <form  onSubmit={handleFetchSynonyms} >
            <label htmlFor="word-input">Yor Word</label>
            <input 
                value={word}
                onChange={(e) => setWord(e.target.value)} 
                id='word-input' 
                type="text" 
            />
            <button>Submit</button>
        </form>
        <ul>
            {Synonyms.map((synonym) => (
                <li onClick={() => {handleSynonymClicked(synonym.word)}} key={synonym.word}>{synonym.word}</li>
            ))}
        </ul>

    </div>
  )
}

export default App2