import {Alert, Button, Stack, TextField} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios'

export default function Provider(){
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");  
  const [email, setEmail] = useState("");
  const [observacao, setObservacao] = useState("");
  const [value, setValue] = useState(false);

  const router = useRouter();

  const handleTextNome = (e) => {
    setNome(e.target.value)
  } 
  const handleTextTelefone = (e) => {
    setTelefone(e.target.value)
  }
  const handleTextEmail = (e) => {
    setEmail(e.target.value)
  } 
  const handleTextObservacao = (e) => {
    setObservacao(e.target.value)
  } 

  const handleOnClick = () => {

    if(!nome || !telefone || !email || !observacao ){
      setValue(true)
    }
    axios({
      method: 'post',
      url: '/api/contatos',
      data:{
        nome,
        email,
        telefone,
        observacao
      }
    })

    router.push('/list')
  }

  return(
    <Box display='flex' flexDirection='column'>
      <Snackbar
        open={value}
        onClose={() => {
          setValue(false)
        }}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical:'top',
          horizontal:'center',
        }}
      >
        <Alert severity="error">
          Preencha todos os campos!
        </Alert>
      </Snackbar>

        <Box display='flex' flexDirection='column' height='100%' width='100%' alignItems='center' justifyContent='center'>
          <Box border={3} display='flex' flexDirection='column' height='100%' width='25%' alignItems='center' justifyContent='center'>
            <h1>Cadastro do Contato</h1>
            <TextField id='nomeText' label='Digite o nome' variant='outlined' margin='dense' value={nome} onChange={handleTextNome}/>
            <TextField id='cidadeText' label='Digite o Telefone' variant='outlined'margin='dense'value={telefone} onChange={handleTextTelefone}/>
            <TextField id='cnpjText' label='Digite seu email' variant='outlined' margin='dense'value={email} onChange={handleTextEmail}/>
            <TextField id='cnpjText' label='Digite a observação' variant='outlined' margin='dense'value={observacao} onChange={handleTextObservacao}/>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' 
              onClick ={handleOnClick} 
              >
                Enviar
              </Button>
              <Button variant='contained' onClick = {()=> {setNome(''), setTelefone(''), setEmail(''), setObservacao('')} }>
                Limpar campos
              </Button>
              <Button variant='contained' onClick = {()=> {router.push('/list') }}>
                Lista de contatos
              </Button>
            </Stack>
          </Box>
        </Box>
    </Box>
  )
}

