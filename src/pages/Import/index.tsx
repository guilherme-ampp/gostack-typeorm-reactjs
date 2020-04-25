import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    uploadedFiles.forEach(async file => {
      try {
        const data = new FormData();
        data.append('file', file.file);
        await api.post('/transactions/import', data);
        const updatedUploadedFiles = uploadedFiles.filter(
          fileProp => fileProp.name !== file.name,
        );
        setUploadedFiles(updatedUploadedFiles);
      } catch (err) {
        console.log(err.response.error);
      }
    });
  }

  function submitFile(files: File[]): void {
    const uploadedFilesProps = files.map<FileProps>(file => {
      return {
        file,
        name: file.name,
        readableSize: filesize(file.size),
        uploaded: false,
      };
    });
    setUploadedFiles(uploadedFilesProps);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Only CSV files allowed
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
