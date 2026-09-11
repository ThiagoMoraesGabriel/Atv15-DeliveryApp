import styles from '../assets/App.module.css';

function ItemCardapio({ nome, descricao, preco, categoria, adicionarItem }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.cardNome}>{nome}</h3>
                {categoria && <span className={styles.cardCategoria}>{categoria}</span>}
            </div>
            
            <p className={styles.cardDescricao}>{descricao}</p>
            
            <div className={styles.cardFooter}>
                <span className={styles.cardPreco}>{preco}</span>
                <button className={styles.btnAdicionar} onClick={adicionarItem}>
                    + Adicionar
                </button>
            </div>
        </div>
    );
}

export default ItemCardapio;