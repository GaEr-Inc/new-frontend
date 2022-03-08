import { Button } from '@mantine/core'
import React from 'react'
import { getUsers } from '../utils/requests'

function UserManager() {

  return (
    <div>
      <Button onClick={() => getUsers()}>
        Click
      </Button>
    </div>
  )
}

export default UserManager