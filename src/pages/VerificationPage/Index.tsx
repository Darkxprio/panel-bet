import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import apiClient from '../../services/apiService';

const VerificationPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('Token no encontrado. El enlace parece ser inválido.');
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await apiClient.post('/auth/verify-email', { token });
                setStatus('success');
                setMessage(response.data.message);
            } catch (error: any) {
                setStatus('error');
                setMessage(error.response?.data?.message || 'Ocurrió un error al verificar la cuenta.');
            }
        };

        verifyToken();
    }, [searchParams]);

    if (status === 'loading') {
        return <div className="h-screen flex justify-center items-center"><Spin size="large" tip="Verificando tu cuenta..." /></div>;
    }

    if (status === 'success') {
        return (
            <Result
                status="success"
                title="¡Cuenta Activada Exitosamente!"
                subTitle={message}
                extra={[
                    <Link to="/login" key="login">
                        <Button type="primary">Ir a Iniciar Sesión</Button>
                    </Link>,
                ]}
            />
        );
    }

    return (
        <Result
            status="error"
            title="Error en la Verificación"
            subTitle={message}
            extra={[
                <Link to="/login" key="login">
                    <Button type="primary" danger>Volver</Button>
                </Link>,
            ]}
        />
    );
};

export default VerificationPage;