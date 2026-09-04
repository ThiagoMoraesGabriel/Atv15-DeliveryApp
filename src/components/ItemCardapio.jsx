function ItemCardapio({ nome, descricao, preco, adicionarItem }) {
    return (
        <article className="menu-item">
            <div className="menu-item-info">
                <h2>{nome}</h2>
                <p className="menu-item-description">{descricao}</p>
                <p className="menu-item-price">{preco}</p>
            </div>

            <button className="add-button" onClick={adicionarItem}>
                + Adicionar
            </button>
        </article>
    );
}

export default ItemCardapio;
