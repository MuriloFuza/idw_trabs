import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

interface IAppPageProps {
  nome: string;
  cnpj: string;
  cidade: string;
}

export default function App({nome, cnpj, cidade}: IAppPageProps){
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
            Dados do Fornecedor
            </Typography>
            <Stack spacing={1}>
              <Typography variant='h6'>
                Nome: {nome}
              </Typography>
              <Typography variant='h6'>
                Cnpj: {cnpj}
              </Typography>
              <Typography variant='h6'>
                Cidade: {cidade}
              </Typography>
              <Button variant='contained' onClick={() => { router.push('/fornecedor/')}}>
                Trocar Fornecedor
              </Button>
              <Button variant='contained' onClick={() => { router.push('/')}}>
                Cadastrar Cliente
              </Button>   
            </Stack>
        </Box>
     </Box>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({query}: GetServerSidePropsContext) => {
  const {nome, cnpj, cidade} = query;
  if(nome && cnpj && cidade){
    return {
      props:{
        nome,
        cnpj,
        cidade
      }
    }
  }
  return{
    redirect:{
      destination:'/fornecedor/',
      permanent:false
    }
  }
}