import logo from './logo.svg';
import './App.css';
import React, {useState,useEffect} from 'react';
import {db} from './config';
let base = "/covid";
function App() {  
const [usuarios, setUsuarios] = useState([]);
const [usuario, setUsuario] = useState({
  bairro:'',
  cep:'',
  cidade:'',
  nome:'',
  rua:''
});
useEffect(async ()=>{
  await listarUsuarios(); 
 },[]);
const limparCampos = () =>{
  setUsuario({
    bairro:'',
    cep:'',
    cidade:'',
    nome:'',
    rua:''
  })
}
const handleInputChange = async (e,index) =>{
  const {name,value} = e.target;
  if(name === 'cep' && value.length === 8){
    await buscarCep(value);
    return;
  }
  setUsuario({
    ...usuario, [name]: value
  });
}
const adicionarUsuario = async ()=>{
  await db.ref(base).push(usuario);
  limparCampos();
  listarUsuarios();
}
const listarUsuarios = async () =>{
  let lista = [];  
  let data = (await db.ref(base).get())
  data.forEach(result =>{
    lista.push(result.val());
  }) 
  setUsuarios(lista);
}
const buscarCep = async (cep)=>{
  let url = `https://viacep.com.br/ws/${cep}/json/`
  await fetch(url)
  .then(resp => resp.json())
  .then((data)=>{
    setUsuario({
      ...usuario,['cidade']: data.localidade,
      ['bairro']: data.bairro,
      ['rua']: data.logradouro,
      ['cep']: cep
    });
  })
}
  return (
    <>    
      <div className='col-md-6'>
        <h1>Informações Covid</h1>
        <label>Nome</label>
        <input className='form-control' name='nome' value={usuario.nome} onChange={handleInputChange}/>
        <label>Cep</label>
        <input className='form-control' name='cep' value={usuario.cep} onChange={handleInputChange}/>
        <label>Cidade</label>
        <input className='form-control' name='cidade' value={usuario.cidade} onChange={handleInputChange}/>
        <label>Bairro</label>
        <input className='form-control' name='bairro' value={usuario.bairro} onChange={handleInputChange}/>
        <label>Rua</label>
        <input className='form-control' name='rua' value={usuario.rua} onChange={handleInputChange}/>
        <br/>
        <button className='btn btn-success' onClick={()=>adicionarUsuario()}>Enviar</button>        
      </div>
      <div className='col-md-12'>
         <table className='table'>
              <thead>
                <tr>
                <th>Nome</th>
                <th>Cep</th>
                <th>Cidade</th>
                <th>Bairro</th>
                <th>Rua</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map(x=>
                  <tr>
                    <td>{x.nome}</td>
                    <td>{x.cep}</td>
                    <td>{x.cidade}</td>
                    <td>{x.bairro}</td>
                    <td>{x.rua}</td>
                  </tr>)}
              </tbody>
            </table>
      </div>
    </>    
  );
}

export default App;
