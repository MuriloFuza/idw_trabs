import {Alert, Button, Stack, TextField} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import { AirlineSeatReclineNormalOutlined } from '@mui/icons-material';

export default function Provider(){
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [value, setValue] = useState(false);

  const router = useRouter();

  const handleTextNome = (e) => {
    setNome(e.target.value)
  } 
  const handleTextEmail = (e) => {
    setEmail(e.target.value)
  } 
  const handleTextSenha = (e) => {
    setSenha(e.target.value)
  }
  const handleTextDataNasc = (e) => {
    setDataNasc(e.target.value)
  } 

  const handleOnClick = () => {

    if(!nome || !email || !senha || !dataNasc){
      setValue(true)
    }
    router.push(`/clienteLst/?nome=${nome}&email=${email}&senha=${senha}&dataNasc=${dataNasc}`)
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
            <h1>Cadastro do Cliente</h1>
            <TextField id='nomeText' label='Digite seu nome' variant='outlined' margin='dense' value={nome} onChange={handleTextNome}/>
            <TextField id='cnpjText' label='Digite seu email' variant='outlined' margin='dense'value={email} onChange={handleTextEmail}/>
            <TextField id='cidadeText' label='Digite sua senha' variant='outlined'margin='dense'value={senha} onChange={handleTextSenha}/>
            <TextField id='cidadeText' label='Confirme sua senha' variant='outlined'margin='dense'/>
            <TextField id='cidadeText' label='Digite sua data de nascimento' variant='outlined'margin='dense'value={dataNasc} onChange={handleTextDataNasc}/>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' 
              onClick ={handleOnClick} 
              >
                Enviar
              </Button>
              <Button variant='contained' onClick = {()=> {setNome(''), setEmail(''), setSenha(''), setDataNasc('')} }>
                Limpar
              </Button>
              <Button variant='contained' onClick={() => { router.push('/fornecedor')}}>
                Cadastrar fornecedor
              </Button>  
            </Stack>
          </Box>
        </Box>
    </Box>
  )
}

