
import { Affix, Button, Table } from '@mantine/core'
import { PlusCircleIcon } from '@primer/octicons-react'
import { nanoid } from 'nanoid'
import React, { useState } from 'react'
import { day } from './PrinterManager'
import { template } from './TemplateEditor'

function PrinterReWork() {
  const templates: template[] = JSON.parse(localStorage.getItem('saves') || '[]')
  const [queue, setQueue] = useState([])
  return (
    <>
    <Affix position={{bottom: 20, right: 20}}>
      <Button
      leftIcon={<PlusCircleIcon/>}
      >
        Añadir Dia
      </Button>
    </Affix>
    <Table>
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Plantilla</th>
          <th>Loteria 1</th>
          <th>Loteria 2</th>
          <th>Encerrado</th>
          <th>Precio</th>
          <th>Premio</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {templates.map(template => 
          <tr key={nanoid()}>
            <td>{template.name}</td>
          </tr>
          )}
      </tbody>
    </Table>
    </>
  )
}

export default PrinterReWork