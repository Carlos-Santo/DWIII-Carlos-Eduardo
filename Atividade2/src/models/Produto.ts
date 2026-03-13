import mongoose, {Schema, Document} from "mongoose";

export interface IProduto extends Document{
    nome:string;
    valor:number;
}

// definindo o Schema (Estrutura do documento do mongoose)
const ProdutoSchema: Schema = new Schema({
    nome: {type: String, require: true},
    valor: {type: Number, require: true},
})

// Exportando modelo para usar no CRUD
export default mongoose.model<IProduto>("shoppingitems", ProdutoSchema);