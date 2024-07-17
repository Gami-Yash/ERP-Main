
router.get('/username', (req, res) => {
    if (req.session.userId) {
        res.json({ username: req.session.userId });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
});