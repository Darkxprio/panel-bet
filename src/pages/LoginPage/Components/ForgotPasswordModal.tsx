import { useState } from 'react';
import { Modal, Form, Input, Button, App as AntApp } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import apiClient from '../../../services/apiService';

type FieldType = {
    email?: string;
};

interface ForgotPasswordModalProps {
    open: boolean;
    onClose: () => void;
}

export const ForgotPasswordModal = ({ open, onClose }: ForgotPasswordModalProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { modal } = AntApp.useApp();

    const handleFinish = async (values: FieldType) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/forgot-password', values);
            modal.success({
                title: 'Petición Recibida',
                content: response.data.message,
                onOk: () => {
                    form.resetFields();
                    onClose();
                },
                centered: true,
            });

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Ocurrió un error inesperado.';
            modal.error({
                title: 'Error',
                content: errorMessage,
                centered: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Reestablecer Contraseña"
            open={open}
            onCancel={onClose}
            centered
            footer={null}
        >
            <p className="text-gray-500 mb-6">Ingresa tu correo electrónico y te enviaremos un enlace para reestablecer tu contraseña.</p>
            <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item<FieldType>
                    name="email"
                    label="Correo Electrónico"
                    rules={[{ required: true, type: 'email', message: 'Por favor, ingresa un correo válido' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="tu.correo@ejemplo.com" size="large" />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        className="w-full bg-green-600 hover:bg-green-700"
                        size="large"
                    >
                        Enviar Enlace
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};