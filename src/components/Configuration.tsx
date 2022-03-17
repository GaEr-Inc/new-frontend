import { ActionIcon, Button, Paper, Text } from '@mantine/core'
import { TrashIcon } from '@primer/octicons-react'
import { resetAll } from '../utils/requests'

function Configuration() {
  return (
    <>
    <div style={{ justifyContent: 'space-between', display: 'flex', paddingLeft: 4}}   >
      <Text>
        Reiniciar Base de Datos
      </Text>
      <ActionIcon
      variant='light'
      onClick={() => resetAll()}
      >
        <TrashIcon/>
      </ActionIcon>
    </div>
    </>
  )
}

export default Configuration