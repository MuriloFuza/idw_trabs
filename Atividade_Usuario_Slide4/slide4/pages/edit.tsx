import {Alert, Button, Stack, TextField} from '@mui/material';
import React, {  useState } from 'react';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import Snackbar from '@mui/material/Snackbar';
import axios, { AxiosError, AxiosResponse } from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next';


interface IAppPageProps {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  observacao: string;
}

export default function Provider({id, nome, telefone, email, observacao}: IAppPageProps){
  const [nomeEdt, setNome] = useState(nome);
  const [telefoneEdt, setTelefone] = useState(telefone);  
  const [emailEdt, setEmail] = useState(email);
  const [observacaoEdt, setObservacao] = useState(observacao);
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

    if(!nomeEdt || !telefoneEdt || !emailEdt || !observacaoEdt ){
      setValue(true)
    }else{
      axios({
        method: 'post',
        url: '/api/contatos',
        data:{
          id,
          nome: nomeEdt,
          email: emailEdt,
          telefone: telefoneEdt,
          observacao: observacaoEdt
        }
      }).then((response: AxiosResponse) => {
        console.log(response.status)
      }).catch((reason: AxiosError) => {
        console.log(reason)
      })
      
      router.push('/list')
    }
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
            <h1>Editar contato: </h1>
            <TextField id='nomeText' label='Digite o nome' variant='outlined' margin='dense' value={nomeEdt} onChange={handleTextNome}/>
            <TextField id='cidadeText' label='Digite o Telefone' variant='outlined'margin='dense'value={telefoneEdt} onChange={handleTextTelefone}/>
            <TextField id='cnpjText' label='Digite seu email' variant='outlined' margin='dense'value={emailEdt} onChange={handleTextEmail}/>
            <TextField id='cnpjText' label='Digite a observação' variant='outlined' margin='dense'value={observacaoEdt} onChange={handleTextObservacao}/>
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

export const getServerSideProps: GetServerSideProps = async ({query}: GetServerSidePropsContext) => {
  const {id, nome, telefone, email, observacao} = query;
  if(id && nome && telefone && email && observacao){
    return {
      props:{
        id,
        nome, 
        telefone, 
        email, 
        observacao
      }
    }
  }
  return{
    redirect:{
      destination:'/list',
      permanent:false
    }
  }
}

