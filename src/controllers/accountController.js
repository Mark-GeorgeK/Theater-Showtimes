
function HandleAccountPage(req, res) {
    const HTML = getHTML('placeholder');
    return res.render('account.ejs', { HTML, req });
}

function getHTML(movie) {
    let HTML = ''
    return HTML;
}

module.exports = HandleAccountPage;