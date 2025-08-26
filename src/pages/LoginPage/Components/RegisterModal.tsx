import { useState } from 'react';
import { Modal, Form, Input, Button, App as AntApp } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import apiClient from '../../../services/apiService';

type FieldType = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

export const RegisterModal = ({ open, onClose }: RegisterModalProps) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { modal } = AntApp.useApp();

    const handleFinish = async (values: FieldType) => {
        setLoading(true);
        try {
            const response = await apiClient.post('/auth/register', values);

            modal.success({
                title: '¡Registro Exitoso!',
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
                title: 'Error en el Registro',
                content: errorMessage,
                centered: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        form.resetFields();
    };

    return (
        <Modal
            title="Crear Nueva Cuenta"
            open={open}
            onCancel={onClose}
            centered
            footer={[
                <Button key="clear" onClick={handleClear}>Limpiar</Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                    className="bg-green-600 hover:bg-green-700"
                >
                    Registrarse
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical" onFinish={handleFinish} autoComplete="off">
                <Form.Item<FieldType> name="username" label="Nombre de Usuario" rules={[{ required: true, message: 'Ingresa un nombre de usuario' }]}>
                    <Input prefix={<UserOutlined />} size="large" />
                </Form.Item>
                <Form.Item<FieldType> name="email" label="Correo Electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}>
                    <Input prefix={<MailOutlined />} size="large" />
                </Form.Item>
                <Form.Item<FieldType> name="password" label="Contraseña" rules={[{ required: true, min: 6, message: 'La contraseña debe tener al menos 6 caracteres' }]}>
                    <Input.Password prefix={<LockOutlined />} size="large" />
                </Form.Item>
                <Form.Item<FieldType>
                    name="confirmPassword"
                    label="Confirmar Contraseña"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Confirma tu contraseña' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Las contraseñas no coinciden'));
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} size="large" />
                </Form.Item>
            </Form>
        </Modal>
    );
};