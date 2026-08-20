import { useEffect, useState } from 'react';
import RecomendacionModalFoto from '../RecomendacionModalFoto/RecomendacionModalFoto';
import clienteAxios from '../../api/axios';

const Recomendacion = ({ show, onClose }) => {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!show) return; // 🔥 solo cuando abre el modal

        setLoading(true);

        clienteAxios.get('/recomendaciones')
        .then((res) => {
            setProductos(res.data);
        })
        .catch((err) => {
            console.error('Error al traer recomendaciones:', err);
        })
        .finally(() => {
            setLoading(false);
        });

    }, [show]);


    const productoMock = [
        { id: '84690', descripcion: 'Tensor Poly V Fosters' },
        { id: '84691', descripcion: 'Tensor Fosters' },
        { id: '84692', descripcion: 'Tensor Poly V' },
    ];

    return (
        <RecomendacionModalFoto
            productos={productos}
            loading={loading}
            show={show}
            onClose={onClose}
        />
    );
};

export default Recomendacion;