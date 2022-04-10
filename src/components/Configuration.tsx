import {
  ActionIcon,
  Alert,
  Button,
  Group,
  Modal,
  Paper,
  Text,
} from "@mantine/core";
import { useModals } from "@mantine/modals";
import { AlertFillIcon, TrashIcon } from "@primer/octicons-react";
import { useState } from "react";
import { resetAll } from "../utils/requests";

function Configuration() {
  const [openedModal, setOpenedModal] = useState<boolean>(false);
  return (
    <>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          paddingLeft: 4,
        }}
      >
        <Text>Reiniciar Base de Datos</Text>
        <ActionIcon
          variant="light"
          color="red"
          onClick={() => setOpenedModal(!openedModal)}
        >
          <TrashIcon />
        </ActionIcon>
        <Modal
          // title="Por favor confirme su acción"
          opened={openedModal}
          hideCloseButton={true}
          onClose={() => setOpenedModal(!openedModal)}
        >
          <Alert
            icon={<AlertFillIcon size={16} />}
            title="Por favor confirme su acción"
            color="red"
          >
            Al reiniciar la base de datos perderá todos los usuarios que haya
            creado y no podrán ser recuperados. ¿Desea reiniciar la base de
            datos?
            <Group style={{ paddingTop: "20px" }} position="right">
              <Button
                size="xs"
                color="green"
                onClick={() => setOpenedModal(!openedModal)}
                // compact
              >
                Cancelar
              </Button>
              <Button
                size="xs"
                color="red"
                // compact
                onClick={() => {
                  resetAll();
                  setOpenedModal(!openedModal);
                }}
              >
                Reiniciar
              </Button>
            </Group>
          </Alert>
        </Modal>
      </div>
    </>
  );
}

export default Configuration;
