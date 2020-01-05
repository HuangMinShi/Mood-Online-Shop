const chai = require('chai')
const request = require('supertest')

const should = chai.should()
const app = require('../../app')

const {
  User,
  sequelize
} = require('../../models')

describe('# User controller', () => {
  describe('# 註冊', () => {
    context('GET  /users/signup', () => {
      it('[✓] 取得頁面', done => {
        request(app)
          .get('/users/signup')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            res.text.should.be.contain('Sign Up')
            done()
          })
      })
    })

    context('POST /users/signup', () => {
      it('[✓] 成功', done => {
        request(app)
          .post('/users/signup')
          .send('name=name&email=email@mail.com&password=password&passwordCheck=password')
          .expect(302)
          .end(async (err, res) => {
            try {
              if (err) {
                throw err
              }

              // 條件 1 成功取得跳轉登入 
              res.text.should.be.contain('/users/signin')
              // 條件 2 成功寫入資料庫
              const user = await User.findOne({
                where: {
                  email: 'email@mail.com'
                }
              })

              user.email.should.be.equal('email@mail.com')
              done()
            } catch (err) {
              return done(err)
            }
          })
      })

      it('[✗] 失敗，name,email,password and passwordCheck 欄位未填', done => {
        request(app)
          .post('/users/signup')
          .send('name=&email=&password=&passwordCheck=')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            // redirect('back) 
            res.text.should.be.contain('/')
            done()
          })
      })

      it('[✗] 失敗，email = \'test@mail\' 格式不合法', done => {
        request(app)
          .post('/users/signup')
          .send('name=name&email=test@mail&password=password&passwordCheck=password')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/')
            done()
          })
      })

      it('[✗] 失敗，2次密碼輸入不一致', done => {
        request(app)
          .post('/users/signup')
          .send('name=name&email=email@mail.com&password=password&passwordCheck=p')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/')
            done()
          })
      })

      it('[✗] 失敗，使用者已註冊', done => {
        request(app)
          .post('/users/signup')
          .send('name=name&email=email@mail.com&password=password&passwordCheck=password')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/')
            done()
          })
      })
    })

    after(async () => {
      try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        await sequelize.query('TRUNCATE TABLE Users')
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
      } catch (err) {
        console.log(err)
      }
    })
  })

  describe('# 登入', () => {
    before(async () => {
      try {
        await User.create({
          name: 'name',
          email: 'email@mail.com',
          password: 'password',
          passwordCheck: 'password'
        })
      } catch (err) {
        console.log(err)
      }
    })

    context('GET  /users/signin', () => {

      it('[✓] 取得頁面', done => {
        request(app)
          .get('/users/signin')
          .expect(200)
          .end((err, res) => {
            if (err) {
              return done(err)
            }
            res.text.should.be.contain('Sign In')
            done()
          })
      })

    })

    context('POST /users/signin', () => {

      it('[✓] 成功', done => {
        request(app)
          .post('/users/signin')
          .send('email=email@mail.com&password=password')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/')
            done()
          })
      })

      it('[✗] 失敗，email and password 欄位未填', done => {
        request(app)
          .post('/users/signin')
          .send('email=&password=')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/')
            done()
          })
      })

      it('[✗] 失敗，email=\'test@mail\' 格式不合法', done => {
        request(app)
          .post('/users/signin')
          .send('email=test@mail&password=password')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/')
            done()
          })
      })

      it('[✗] 失敗，密碼輸入錯誤', done => {
        request(app)
          .post('/users/signin')
          .send('email=email@mail.com&password=p')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/users/signin')
            done()
          })
      })

      it('[✗] 失敗，未註冊', done => {
        request(app)
          .post('/users/signin')
          .send('email=email2@mail.com&password=password')
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            res.text.should.be.contain('/users/signin')
            done()
          })
      })
    })

    after(async () => {
      try {
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
        await sequelize.query('TRUNCATE TABLE Users')
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
      } catch (err) {
        console.log(err)
      }
    })
  })
})