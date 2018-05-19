import {
    chai,
    App,
    token
} from '../../setup';

describe('DELETE /api/v1/menu/:date', function() {
    it('should return a success status code and message', async function() {
        try {
            const res = await chai.request(App)
                .delete('/api/v1/menu/2018-06-26')
                .set('Authorization',  `Bearer ${token}`);

            res.should.have.status(200);
            res.body.should.deep.equal({
                status: 'success',
                message: 'menu deleted successfully'
              })
        } catch (err) {
            throw err;
        }
    })

    it('should return an error status code and message if not found', async function() {
        try {
            const res = await chai.request(App)
                .delete('/api/v1/menu/2029-05-05')
                .set('Authorization',  `Bearer ${token}`)

            res.should.have.status(404);
            res.body.should.deep.equal({
              status: 'error',
              message: 'menu not found'
            })
        } catch (err) {
            throw err;
        }
    })

})