import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        if (values.email === 'admin@test.com' && values.password === '123456') {
            message.success('¡Bienvenido!');
            navigate('/dashboard');
        } else {
            message.error('Credenciales incorrectas');
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h1>
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Por favor ingresa tu correo!' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Correo (admin@test.com)" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña!' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Contraseña (123456)"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Ingresar
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;