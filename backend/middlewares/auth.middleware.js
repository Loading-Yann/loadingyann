import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  console.log('Vérification du token...');
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    console.log('Token manquant');
    return res.status(401).json({ message: 'Token manquant, accès refusé.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token décodé :', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Token invalide :', err.message);
    return res.status(401).json({ message: 'Token invalide, accès refusé.' });
  }
};

export default auth;
