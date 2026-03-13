import { Router, Request, Response } from "express";
import Produto from "../models/Produto";

const router = Router();

router.post("/", async (req:Request, res:Response) => {
    try{
        const novoProduto = new Produto(req.body);
        const produtoSalvo = await novoProduto.save();
        res.status(201).json(produtoSalvo);
    } catch(erro:unknown)
    {
        if(erro instanceof Error){
            res.status(400).json({ erro: erro.message});
        }
        else{
            res.status(400).json({erro: String(erro)})
        }
    }
})

router.get("/", async (_req:Request, res:Response) => {
    try{
        const produtos = await Produto.find();
        res.json(produtos); 
    }
    catch(erro: unknown){
        if (erro instanceof Error){
            res.status(500).json({ erro: erro.message});
        }
        else{
            res.status(500).json({erro: String(erro)})
        }
    }
})

router.put("/:id", async (_req:Request, res:Response) => {
    try{
        const {id} = _req.params;
        const produtoAtualizado = await Produto.findByIdAndUpdate(
            id,
            _req.body,
            {new:true}
        );
        if (!produtoAtualizado){
            return res.status(404).json({erro: "Produto não encontrado"})
        }
        
        res.json(produtoAtualizado);
    }
    catch(erro: unknown){
        if (erro instanceof Error){
            res.status(500).json({ erro: erro.message});
        }
        else{
            res.status(500).json({erro: String(erro)})
        }
    }
})

router.delete("/:id", async (_req:Request, res:Response) => {
    try{
        const {id} = _req.params;
        const produtoRemovido = await Produto.findByIdAndDelete(id);
        if (!produtoRemovido){
            return res.status(404).json({erro: "Produto não encontrado"})
        }

        res.json({mensagem: "Produto excluído com sucesso"});
    }
    catch(erro: unknown){
        if (erro instanceof Error){
            res.status(400).json({ erro: erro.message});
        }
        else{
            res.status(400).json({erro: String(erro)})
        }
    }
})

export default router;