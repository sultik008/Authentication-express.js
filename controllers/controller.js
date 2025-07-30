import * as service from '../services/service.js'

export async function loginUser(req, res) {
  try {
    const result = await service.loginUser(req.body);
    res.json(result);
  } catch (e) {
    res.status(e.stat || 500).json(e);
  }
}

export async function addUser(req, res) {
  try {
    const result = await service.addUser(req.body);
    res.json(result);
  } catch (e) {
    res.status(e.stat || 500).json({ message: e.message });
  }
}

export async function getUser(req, res) {
  try {
    const result = await service.getUser();
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function getUsersByLastLog(req, res) {
  try {
    const result = await service.getUsersByLastLog(req.query.email)
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function block(req, res) {
  try {
    const result = await service.block(req.body.ids);
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
export async function unBlock(req, res) {
  try {
    const result = await service.unBlock(req.body.ids);
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const result = await service.deleteUser(req.body.ids);
    res.json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
