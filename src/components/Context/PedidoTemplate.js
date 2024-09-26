const PedidoTemplate = (pedido, total) => {

    return (
        <table id="tabla_pedido" style="width: 100%;  flex-direction: row;">
            <tr style="width: 100%;">
                <th>ID</th>
                <th>Código Fabricante</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Precio</th>
            </tr>
            ${
                pedido.forEach(
                    unPedido => {
                        console.log(unPedido);
                        return (
                            `
                                <tr>
                                    <td style="width: 10%; text-align: center;">${unPedido.id}</td>
                                    <td style="width: 20%; text-align: center;">${unPedido.codigoFabrica}</td>
                                    <td style="width: 50%; text-align: center;">${unPedido.nombre}</td>
                                    <td style="width: 10%; text-align: center;">${unPedido.nuevaCantidad}</td>
                                    <td style="width: 10%; text-align: center;">$${unPedido.precioDefinitivo}</td>
                                </tr>
                            `
                        )
                    }
                )
            }
            <tr>
                <td style="width: 10%; text-align: center;"></td>
                <td style="width: 20%; text-align: center;"></td>
                <td style="width: 50%; text-align: center;"></td>
                <td style="width: 10%; text-align: center;">Total:</td>
                <td style="width: 10%; text-align: center;">$${total}</td>
            </tr>
        </table>
    );
}
export default PedidoTemplate;