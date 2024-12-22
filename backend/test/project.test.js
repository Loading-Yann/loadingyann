import request from 'supertest';
import app from '../app';

describe('Test des routes Projects', () => {
  it('GET /api/projects - devrait retourner tous les projets', async () => {
    const response = await request(app).get('/api/projects');
    expect(response.status).toBe(200); // Vérifie que le statut est 200
    expect(response.body).toBeInstanceOf(Array); // Vérifie que la réponse est un tableau
  });
});
