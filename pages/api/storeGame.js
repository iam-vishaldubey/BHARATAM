import calcPoints from '@/components/calcPoints';
import storeGame from '@/components/storeGame';
// multiplayer after guess
export default async function guess(req, res) {
  const { lat, long, actualLat, actualLong, usedHint, secret, roundTime, maxDist } = req.body;

  if(secret) {
    try {
      const calcXp = Math.round(calcPoints({ guessLat: lat, guessLon: long, lat: actualLat, lon: actualLong, usedHint, maxDist }) / 50);
      await storeGame(secret, calcXp, roundTime, [lat, long]);
    } catch (error) {
      return res.status(500).json({ error: 'An error occurred', message: error.message });
    }
  }
  res.status(200).json({ success: true });
}
