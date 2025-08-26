import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Spin, App as AntApp } from 'antd';
import { LockOutlined, UserOutlined, RiseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { ForgotPasswordModal } from './Components/ForgotPasswordModal';
import { RegisterModal } from './Components/RegisterModal';
import authService from '../../services/authService';
type FieldType = {
    email?: string;
    password?: string;
};

const LoginPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const { message, modal } = AntApp.useApp();

    const onFinish = async (values: FieldType) => {
        setLoading(true);
        try {
            const response = await authService.login(values);
            if (response.token) {
                authService.storeToken(response.token);
                message.success('¡Bienvenido!');
                navigate('/dashboard');
            } else {
                throw new Error("No se recibió token del servidor");
            }

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Error al conectar con el servidor.';
            modal.error({
                title: 'Error de Autenticación',
                content: errorMessage,
                centered: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div
                className="h-screen w-screen flex justify-center items-center bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2940&auto-format&fit=crop')" }}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full max-w-sm p-8 bg-gray-900/80 border border-gray-700 rounded-xl shadow-2xl"
                >
                    <Spin spinning={loading} tip="Verificando..." size="large" fullscreen />
                    <div className="text-center mb-8">
                        <RiseOutlined className="text-5xl text-green-500" />
                        <h1 className="text-3xl font-bold text-white mt-4">BetStat Pro</h1>
                        <p className="text-gray-400">Análisis y Valor a tu alcance</p>
                    </div>

                    <Form name="login_form" onFinish={onFinish} autoComplete="off">
                        <Form.Item<FieldType> name="email" rules={[{ required: true, type: 'email', message: 'Por favor ingresa un correo válido!' }]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon text-gray-400" />} placeholder="Correo" size="large" />
                        </Form.Item>
                        <Form.Item<FieldType> name="password" rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}>
                            <Input.Password prefix={<LockOutlined className="site-form-item-icon text-gray-400" />} placeholder="Contraseña" size="large" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="w-full bg-green-600 hover:bg-green-700 border-none" size="large" loading={loading}>
                                {loading ? 'Verificando...' : 'Ingresar al Panel'}
                            </Button>
                        </Form.Item>
                    </Form>

                    {/* --- INICIO DE LOS CAMBIOS --- */}
                    <div className="text-center text-sm mt-4">
                        <span className="text-gray-400">¿Olvidaste tu contraseña? </span>
                        <a onClick={() => setIsForgotModalOpen(true)} className="font-medium text-green-500 hover:text-green-400 cursor-pointer">
                            Recupérala aquí
                        </a>
                    </div>
                    <div className="text-center text-sm mt-2">
                        <span className="text-gray-400">¿No tienes una cuenta? </span>
                        <a onClick={() => setIsRegisterModalOpen(true)} className="font-medium text-green-500 hover:text-green-400 cursor-pointer">
                            Regístrate ahora
                        </a>
                    </div>
                    {/* --- FIN DE LOS CAMBIOS --- */}
                </motion.div>
            </div>

            {/* Renderizamos los modales aquí, su visibilidad la controla su estado interno */}
            <ForgotPasswordModal
                open={isForgotModalOpen}
                onClose={() => setIsForgotModalOpen(false)}
            />
            <RegisterModal
                open={isRegisterModalOpen}
                onClose={() => setIsRegisterModalOpen(false)}
            />
        </>
    );
};

export default LoginPage;