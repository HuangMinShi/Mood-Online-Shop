const chai = require('chai')
chai.use(require('sinon-chai'));

const should = chai.should()

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists
} = require('sequelize-test-helpers')

const compareModelName = (testedModel, name) => {
  const Model = testedModel(sequelize, dataTypes)
  checkModelName(Model)(name)
}

const checkModelProperties = (testedModel, propertiesArray) => {
  const Model = testedModel(sequelize, dataTypes)
  const model = new Model() // 不建議，new User() 為封裝好的 class 

  context('properties', () => {
    propertiesArray.forEach(checkPropertyExists(model))
  })

}

const checkModelAssociations = (testedModel, associationModelPairsArray) => {
  const Model = testedModel(sequelize, dataTypes)

  context('associations', () => {
    associationModelPairsArray.forEach(pair => {
      const [association, model] = pair
      Model.associate({
        [model]: model
      })
      // sinon-chai
      it(`should ${association} ${model}`, done => {
        Model[association].should.have.been.calledWith(model)
        done()
      })
    })

  })
}

const checkModelCRUD = (Model, createOptions) => {
  context('action', () => {
    let data = null

    it('create', async () => {
      try {
        data = await Model.create(createOptions)
        should.exist(data)
      } catch (err) {
        console.error(err)
      }
    })

    it('read', async () => {
      try {
        const user = await Model.findByPk(data.id)
        data.id.should.be.equal(user.id)
      } catch (err) {
        console.error(err)
      }
    })

    it('update', async () => {
      try {
        await Model.update({}, {
          where: { id: data.id }
        })
        const user = await Model.findByPk(data.id)
        data.updatedAt.should.be.not.equal(user.updatedAt)
      } catch (err) {
        console.error(err)
      }
    })

    it('delete', async () => {
      try {
        await Model.destroy({
          where: { id: data.id }
        })
        const user = await Model.findByPk(data.id)
        should.not.exist(user)
      } catch (err) {
        console.error(err)
      }
    })
  })
}

module.exports = {
  checkModelAssociations,
  checkModelProperties,
  compareModelName,
  checkModelCRUD
}