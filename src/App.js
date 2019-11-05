import React, {useState, useEffect, useMemo} from 'react';

function App(){
    const [tarefas, setTarefas] = useState([
        // 'Pagar a conta de luz',
        // 'Estudar React Hooks'
    ]);

    const [titulo, setTitulo] = useState('Hooks');
    const [input, setInput] = useState('');
    const [contador, setContador] = useState(0);

    useEffect( () => {
        console.log("Houve alteração em tarefas");
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]); //monitora alteração no state 'tarefas' (componentDidUpdate)

    useEffect( ()=> {
        console.log("componente foi criado");
        const tarefasStorage = localStorage.getItem('tarefas');

        if(tarefasStorage){
            setTarefas(JSON.parse(tarefasStorage));
        }

    }, []);// executa quando o componente é criado (componentDidMount)

    function handleAdd(){
        // setTarefas([...tarefas, 'Aprender JavaScript']);
        setTarefas([...tarefas, input]);
        setInput('');
    }

    const totalTarefas = useMemo( ()=> {
        return tarefas.length;
    }, [tarefas]); //é executado somente quando 'tarefas' sofrer alteração, passando o valor do cálculo para total tarefas

    return(
        <div>
            <h1>{titulo}</h1>
            <ul>
                {tarefas.map(tarefa => (
                    <li key={tarefa}>{tarefa}</li>
                ))
                }
            </ul>
            <br/>
            {/* <strong>Você tem {tarefas.length} tarefas!</strong><br/> */}
            <strong>Você tem {totalTarefas} tarefas!</strong><br/>
            <input type="text" value={input} onChange={ (event) => setInput(event.target.value) }/>
            <button type="button" onClick={handleAdd}>Adicionar</button>
            <div>
                <p>You clicked {contador} times</p>
                <button onClick={ ()=> setContador(contador + 1) }>Aumentar</button>
            </div>
        </div>
    );
}

export default App;