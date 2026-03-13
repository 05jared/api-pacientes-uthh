import * as noticiaModel from '../models/noticias.model.js';

export const getNoticias = async (req, res) => {
  try {
    const noticias = await noticiaModel.getAllNoticias();
    res.status(200).json(noticias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNoticia = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    if (!titulo || !descripcion) {
      return res.status(400).json({ msg: "Faltan datos obligatorios" });
    }

    const nuevo = await noticiaModel.createNoticia(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await noticiaModel.updateNoticia(id, req.body);
    res.status(200).json({ msg: "Noticia actualizada", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await noticiaModel.deleteNoticia(id);
    res.status(200).json({ msg: "Noticia eliminada", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};