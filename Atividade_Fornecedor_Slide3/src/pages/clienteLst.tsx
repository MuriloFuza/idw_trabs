import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

interface IAppPageProps {
  nome: string;
  email: string;
  senha: string;
  dataNasc: string;
}

export default function App({nome, email, senha, dataNasc}: IAppPageProps){
  const router = useRouter();
  return (
    <>
      <Box display='flex' flexDirection='column' height='100%' width='100%' alignItems='center' justifyContent='center'>
        <Box 
          border={3} 
          display='flex' 
          flexDirection='column' 
          height='100%' 
          width='fit-content' 
          alignItems='left' 
          justifyContent='center' 
          padding={2} 
        >
            <Typography variant='h2'>
            Dados do Cliente
            </Typography>
            <Stack spacing={1}>
              <Typography variant='h6'>
                Nome: {nome}
              </Typography>
              <Typography variant='h6'>
                Email: {email}
              </Typography>
              <Typography variant='h6'>
                Senha: {senha}
              </Typography>
              <Typography variant='h6'>
                Data de Nascimento: {dataNasc}
              </Typography>
              <Button variant='contained' onClick={() => { router.push('/')}}>
                Trocar Cliente
              </Button>
              <Button variant='contained' onClick={() => { router.push('/fornecedor')}}>
                Cadastrar fornecedor
              </Button>  
            </Stack>
        </Box>
     </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}: GetServerSidePropsContext) => {
  const {nome, email, senha, dataNasc} = query;
  if(nome && email && senha && dataNasc){
    return {
      props:{
        nome, 
        email, 
        senha, 
        dataNasc
      }
    }
  }
  return{
    redirect:{
      destination:'/',
      permanent:false
    }
  }
}