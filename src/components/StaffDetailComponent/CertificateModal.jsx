import { Box, Modal, Typography } from '@mui/material'
import React from 'react'
import styles from "../../pages/home/ListNanny.module.scss"

const CertificateModal = ({ isOpen, onCloseModal, renderData }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onCloseModal}
            aria-labelledby="modal-language"
            aria-describedby="modal-language-des"
        >
            {/* Modal delete */}
            <Box
                // sx={styleViewImage}
                className={styles.modalLanguageDescription}
            >
                <Typography
                    id="modal-language"
                    variant="h6"
                    component="h2"
                    fontWeight="bold"
                    fontSize="28px"
                    textAlign={'center'}
                >
                    資格
                </Typography>
                <div
                    id="modal-language-des"
                >
                    {renderData}
                </div>
            </Box>
        </Modal>
    )
}

export default CertificateModal