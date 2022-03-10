import { Button, Center, Text } from '@mantine/core'
import React from 'react'

function FileDownloader() {
  return (
    <>
    <Center>

      <Text size='xl' weight={700} mb={15} >Administrador de Archivos</Text>
    </Center>
    <Center>
      <Button style={{marginInline: 10}}>
        Descargar Ultimo Archivo de 18 Dias
      </Button>
      <Button style={{marginInline: 10}}>
        Descargar Ultimo Archivo de Un Dia
      </Button>
    </Center>
    </>
  )
}

export default FileDownloader