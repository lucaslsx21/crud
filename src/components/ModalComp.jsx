import { 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from 'react';

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
    const [name, setName] = useState(dataEdit.name || "");
    const [birth, setBirth] = useState(dataEdit.birth || "");
    const [fone, setFone] = useState(dataEdit.fone || "");
    const [email, setEmail] = useState(dataEdit.email || "");

    const handleSave = () => {
        if (!name || !birth || !fone || !email) return;

        if (emailAlreadyExists()) {
            return alert("E-mail já cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, birth, fone, email };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, birth, fone, email }]
            : [...(data ? data : [])];

        localStorage.setItem("cad_participante", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    };
// verifica se existe o email que estou digitando
    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }
        return false;
    };

    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Cadastro de Participantes</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl display="flex" flexDir="column" gap={4}>
                        <Box>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Birth</FormLabel>
                            <Input
                                type="text"
                                value={birth}
                                onChange={(e) => setBirth(e.target.value)}
                            />
                        </Box>
                        <Box>
                            <FormLabel>Fone</FormLabel>
                            <Input
                                type="text"
                                value={fone}
                                onChange={(e) => setFone(e.target.value)}
                        />
                        </Box>
                        <Box>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                        />
                        </Box>
                    </FormControl>
                </ModalBody>
{/* serve para salvar */}
                <ModalFooter justifyContent="start">
                    <Button colorScheme="green" mr={3} onClick={handleSave}>
                        SALVAR
                    </Button>
{/* serve para apagar */}
                    <Button colorScheme="red" onClick={onClose}>
                        CANCELAR
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    );
};

export default ModalComp;

