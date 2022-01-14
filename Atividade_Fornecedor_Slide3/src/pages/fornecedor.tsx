import {Alert, Button, Stack, TextField} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';

export default function Provider(){
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [cidade, setCidade] = useState("");
  const [value, setValue] = useState(false);

  const router = useRouter();

  const handleTextNome = (e) => {
    setNome(e.target.value)
  } 
  const handleTextCnpj = (e) => {
    setCnpj(e.target.value)
  } 
  const handleTextCidade = (e) => {
    setCidade(e.target.value)
  } 

  const handleOnClick = () => {

    if(!nome || !cnpj || !cidade){
      setValue(true)
    }
    router.push(`/fornecedorLst/?nome=${nome}&cnpj=${cnpj}&cidade=${cidade}`)
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
            <h1>Cadastro de Fornecedor</h1>
            <TextField id='nomeText' label='Digite seu nome' variant='outlined' margin='dense' value={nome} onChange={handleTextNome}/>
            <TextField id='cnpjText' label='Digite seu cnpj' variant='outlined' margin='dense'value={cnpj} onChange={handleTextCnpj}/>
            <TextField id='cidadeText' label='Digite sua Cidade' variant='outlined'margin='dense'value={cidade} onChange={handleTextCidade}/>
            <Stack spacing={2} direction='row'>
              <Button variant='contained' 
              onClick ={handleOnClick} 
              >
                Enviar
              </Button>
              <Button variant='contained' onClick = {()=> {setNome(''), setCnpj(''), setCidade('')} }>
                Limpar
              </Button>
              <Button variant='contained' onClick={() => { router.push('/')}}>
                Cadastrar Cliente
              </Button>  
            </Stack>
          </Box>
        </Box>
    </Box>
  )
}

