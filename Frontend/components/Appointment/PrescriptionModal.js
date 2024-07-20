import { prescriptionCreate } from "@/api/api/Doctor/auth";
import {
    Avatar,
    Modal,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    useDisclosure,
    Flex,
    Input,
    SimpleGrid,
    Text,
    useColorModeValue,
    Box,
    Button,
    FormControl,
    FormLabel,
    Stack,
    Select,
    Heading,
    Spacer,
    Progress,
    HStack,
    VStack,
    Spinner,
    Textarea,
  } from "@chakra-ui/react";
  import { MdCancel } from "react-icons/md";
import { useEffect, useState } from "react";
import {
    FileUpload,
    FileUploadDropzone,
    FileUploadButton,
    FileUploadTrigger,
    FileUploadPreview,
} from '@saas-ui/file-upload'
import storage from "../../FireBase/firebaseConfig";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer, toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRouter } from "next/router";

export default  function AddPrescriptionModal({isPresOpen,onPresClose,doctorId,data}) {
    const router = useRouter();
    const [medicineCount, setMedicineCount] = useState(1);
    const [current, setCurrent] = useState(1);
    const [description, setDescription] = useState();
    const [diagnosis, setDiagnosis] = useState();
    const [remarks, setRemarks] = useState();
    const [medicines, setMedicines] = useState([
      { name: "", dosage: 0, duration: 0, instruction: "" },
    ]);
    const [reports,setReports] = useState([]);
    
    const [percent, setPercent] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loading2,setLoading2] = useState(false)
    console.log(reports)
    const handleFilesUpload = (files) => {
        if (files.length > 4) {
            toast.error("You can upload a maximum of 4 Files");
            return;
        }
    
        if (files.length === 0) {
            toast.error("Please upload atleast 1 Files");
            setPercent(0);
            return;
        }
    
        const uploadPromises = [];
        const updatedReports = [...reports]; 
        let count = 0;
    
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = ref(
                storage,
                `/Reports/doctor_${data.doctor}/user_${data.user}/${data.patient.name}/Report-${i + 1}`
            );
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadPromises.push(
                new Promise((resolve, reject) => {
                    setLoading(true)
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const percent = Math.round(
                                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                            );
                            if (percent === 100) {
                                count++;
                            }
                            setPercent((count / files.length) * 100);
                        },
                        reject,
                        async () => {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            updatedReports.push(downloadURL); 
                            resolve();
                        }
                    );
                })
            );
    
        }
        Promise.all(uploadPromises)
            .then(() => {
                setLoading(false)
                toast.success("Files Uploaded Successfully");
                setReports(updatedReports);
            })
            .catch((error) => {
                setLoading(false)
                console.error("Error uploading files:", error);
                toast.error("Error uploading Files");
            });
    };

    const handleMedicineCountChange = (count) => {
      setMedicineCount(count);
      const newMedicines = Array.from({ length: count }, () => ({
        name: "",
        dosage: "",
        duration: "",
        instruction: "",
      }));
      setMedicines(newMedicines);
    };

    const handleMedicineChange = (index, field, value) => {
      const updatedMedicines = [...medicines];
      updatedMedicines[index][field] = value;
      setMedicines(updatedMedicines);
      console.log(medicines);
    };
    async function createPres() {
      const token = await localStorage.getItem("docToken");
      if (token != null) {
        const setData = {
          user: data.user,
          patient: data.patient,
          symptoms: data.symptoms,
          description: description,
          diagnosis: diagnosis,
          medicines: medicines,
          remarks: remarks,
          reports:reports,
        };
        console.log(data);
        const response = await prescriptionCreate(setData,token)
        if (response.status === 200) {
          const res = response
          router.reload();
        } else {
          console.error("request failed");
        }
      }
    }
    return (
      <>
        <Modal isOpen={isPresOpen} onClose={onPresClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Prescription</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column" gap={4}>
                <form>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                      type="text"
                      name="description"
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Diagnosis</FormLabel>
                    <Input
                      type="text"
                      name="diagnosis"
                      onChange={(e) => {
                        setDiagnosis(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Flex direction={"row"} gap={1}>
                    <FormControl>
                      <FormLabel>Medicine</FormLabel>
                      <Select onChange={(e) => setCurrent(e.target.value)}>
                        {Array.from({ length: medicineCount }, (_, i) => (
                          <option key={i} value={i + 1}>
                            Medicine {i + 1}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl w="40%">
                      <FormLabel>No of Meds</FormLabel>
                      <Input
                        type="number"
                        value={medicineCount}
                        onChange={(e) => {
                          handleMedicineCountChange(e.target.value);
                        }}
                      />
                    </FormControl>
                  </Flex>

                  <Stack spacing={4} p={3}>
                    <Box>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        name={`medicines[${current - 1}][name]`}
                        value={medicines[current - 1]?.name}
                        onChange={(e) =>
                          handleMedicineChange(
                            current - 1,
                            "name",
                            e.target.value
                          )
                        }
                      />
                      <FormLabel>Dosage</FormLabel>
                      <Input
                        type="number"
                        name={`medicines[${current - 1}][dosage]`}
                        value={medicines[current - 1]?.dosage}
                        onChange={(e) =>
                          handleMedicineChange(
                            current - 1,
                            "dosage",
                            e.target.value
                          )
                        }
                      />
                      <FormLabel>Duration</FormLabel>
                      <Input
                        type="number"
                        name={`medicines[${current - 1}][duration]`}
                        value={medicines[current - 1]?.duration}
                        onChange={(e) =>
                          handleMedicineChange(
                            current - 1,
                            "duration",
                            e.target.value
                          )
                        }
                      />
                      <FormLabel>Instruction</FormLabel>
                      <Input
                        type="text"
                        name={`medicines[${current - 1}][instruction]`}
                        value={medicines[current - 1]?.instruction}
                        onChange={(e) =>
                          handleMedicineChange(
                            current - 1,
                            "instruction",
                            e.target.value
                          )
                        }
                      />
                    </Box>
                  </Stack>
                  <FormControl>
                    <FormLabel>Remarks</FormLabel>
                    <Textarea
                      type="text"
                      name="remarks"
                      onChange={(e) => {
                        setRemarks(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Box pt={2}>
                    <Text fontWeight={600} fontSize={17}>Reports</Text>
                            <FileUpload
                                maxFiles={4}
                                accept="application/pdf"
                            >
                                {({ files, deleteFile }) => (
                                    <FileUploadDropzone>
                                        <Text fontSize="sm">Drag your Files here</Text>
                                        {/* {console.log(files)} */}
                                        {!files?.length ? (
                                            <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
                                        ) : (
                                            <Flex direction="column" gap={3} alignItems="center">
                                                <HStack >
                                                    {files.map((file, ind) => {
                                                        return (
                                                            <VStack>
                                                                {reports.length === [].length && <MdCancel
                                                                    cursor={"pointer"}
                                                                    color="red"
                                                                    size={25}
                                                                    rounded="full"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation()
                                                                        deleteFile(file)
                                                                    }}
                                                                />}

                                                                <FileUploadPreview file={file} width="200px" />

                                                            </VStack>
                                                        )
                                                    })}

                                                </HStack>
                                                {

                                                    loading ? (<Spinner />) : reports.length === [].length && (<Button
                                                        fontFamily={"heading"}
                                                        mt={8}
                                                        color="white"
                                                        bg="#2DCF57"
                                                        onClick={() => { handleFilesUpload(files) }} >Upload</Button>)
                                                }

                                            </Flex>
                                        )}
                                    </FileUploadDropzone>
                                )}
                            </FileUpload>
                            <Progress value={percent} colorScheme="green" />
                        </Box>
                </form>
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onPresClose}>
                Close
              </Button>
              <Button colorScheme="blue" mr={3} onClick={createPres}>
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                // transition:Bounce
                />
      </>
    );
  }