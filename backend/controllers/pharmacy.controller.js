import { getDb } from '../db/index.js';

export const getPharmacies = async (req, res) => {
  try {
    const { id, sellerId, verificationStatus, city } = req.query;
    const db = await getDb();
    let pharmacies = db.data.pharmacies || [];

    if (id) pharmacies = pharmacies.filter((p) => p.id === id);
    if (sellerId) pharmacies = pharmacies.filter((p) => p.sellerId === sellerId);
    if (verificationStatus) pharmacies = pharmacies.filter((p) => p.verificationStatus === verificationStatus);
    if (city) pharmacies = pharmacies.filter((p) => p.address?.city === city);

    res.json(pharmacies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pharmacies' });
  }
};

export const updatePharmacy = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    const index = db.data.pharmacies.findIndex((p) => p.id === id);
    if (index === -1) return res.status(404).json({ error: 'Pharmacy not found' });

    db.data.pharmacies[index] = {
      ...db.data.pharmacies[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    await db.write();
    res.json(db.data.pharmacies[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pharmacy' });
  }
};

export const getMedicines = async (req, res) => {
  try {
    const { id, category, rxRequired } = req.query;
    const db = await getDb();
    let medicines = db.data.medicines || [];

    if (id) medicines = medicines.filter((m) => m.id === id);
    if (category) medicines = medicines.filter((m) => m.category === category);
    if (rxRequired !== undefined) medicines = medicines.filter((m) => String(m.rxRequired) === String(rxRequired));

    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    const index = db.data.medicines.findIndex((m) => m.id === id);
    if (index === -1) return res.status(404).json({ error: 'Medicine not found' });

    db.data.medicines[index] = {
      ...db.data.medicines[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    await db.write();
    res.json(db.data.medicines[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update medicine' });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await getDb();
    const original = db.data.medicines.length;
    db.data.medicines = db.data.medicines.filter((m) => m.id !== id);
    if (db.data.medicines.length === original) return res.status(404).json({ error: 'Medicine not found' });
    await db.write();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete medicine' });
  }
};
