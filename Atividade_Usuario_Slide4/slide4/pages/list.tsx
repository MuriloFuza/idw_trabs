import {  Paper,Button,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Stack, TextField, Snackbar, Alert } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function App(){
  const router = useRouter();
  const [contatos, setContatos] = useState([]);
  useEffect(() => { 
    ;(async () => {
      const response =  await axios({
        method: 'get',
        url: '/api/contatos',
      })
      setContatos(response.data)
    })()
  },[])

  const handleOnClick = () => {
    axios({
      method: 'delete',
      url: '/api/contatos',
    })
    window.location.reload();
  }
  const [identificador, setId] = useState("");
  const [value, setValue] = useState(false);
  const [valueInv, setValueInvalid] = useState(false);

  const handleTextId = (e) => {
    setId(e.target.value)
  } 

  const handleOnClickEnviar = () => {
    if(!identificador){
      setValue(true)
    }else{
      const find = contatos.find(contato => parseInt(contato.id) === parseInt(identificador))
      if(find){
        router.push(`/edit/?id=${find.id}&nome=${find.nome}&telefone=${find.telefone}&email=${find.email}&observacao=${find.observacao}`)
      }else{
        setValueInvalid(true)
      }
    }
  }


  return(
    <>
      <Box display='flex' flexDirection='column' height='100%' width='100%' alignItems='center' justifyContent='center'>
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
          Preencha o campo corretamente!
        </Alert>
      </Snackbar>

      <Snackbar
        open={valueInv}
        onClose={() => {
          setValueInvalid(false)
        }}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical:'top',
          horizontal:'center',
        }}
      >
        <Alert severity="error">
          Id não encontrado
        </Alert>
      </Snackbar>
        
        <Box 
          border={3} 
          display='flex' 
          flexDirection='column' 
          height='100%' 
          width='100%' 
          alignItems='left' 
          justifyContent='center' 
          padding={2} 
        >
          <Typography variant='h2'>
            Contatos
          </Typography>
          <Stack spacing={1} paddingBottom={2}width='20%'>
            <Button variant='contained' onClick = {handleOnClick} >
                  Deletar contatos
            </Button>
            <Button variant='contained' onClick = {() => {router.push('/')}}>
                  Cadastrar novo contato
            </Button>
            <Stack flexDirection='row'>
              <Button  onClick = {handleOnClickEnviar}>
                  Editar
              </Button>
              <TextField id='nomeText' label='Id do contato para editar' variant='outlined' margin='dense' value={identificador} onChange={handleTextId}/>
            </Stack>
          </Stack>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650}} size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Telefone</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Observação</TableCell>
                  <TableCell align="left">Data de Cadastro</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contatos.map((contato) => (
                  <TableRow key = {contato.id}>
                    <TableCell>{contato.id}</TableCell>
                    <TableCell>{contato.nome}</TableCell>
                    <TableCell>{contato.telefone}</TableCell>
                    <TableCell>{contato.email}</TableCell>
                    <TableCell>{contato.observacao}</TableCell>
                    <TableCell>{contato.dataCadastro}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
     </Box>
    </>
  )
}