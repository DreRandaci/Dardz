import { Record } from 'immutable';

/*
  Records are "smart" pieces of immutable data that
  link a resource type with the api layer.
  All Records will be a instaniated with a
  Recource() function which will return a Record factory
  with the appropirate resource relevant methods.
*/

/*
  @param service: the feathers service for this resource
  @param defaultValues: and obj literal of default keys for the resource
    like email, name, etc
  @param methods: and obj literal of additional methods to apply
    to the Record
*/
export default (service, defaultValues, methods) => {
  class Resource extends Record({
    ...defaultValues,
    // Also tack on some standard values that all records have
    createdAt: '',
    updatedAt: '',
    __v: '',
    _id: ''
  }) {

    create(serviceParams = {}) {
      if (this._id) {
        return new Error('Method create() cannot be called on a record with an _id prop already');
      }
      return service.create(this, serviceParams);
    };

    async update(serviceParams = {}) {
      if (!this._id) {
        return new Error('Method update() must be called on a record with an _id.');
      }
      return service.update(this._id, this, serviceParams);
    };

    async patch(serviceParams = {}) {
      if (!this._id) {
        return new Error('Method patch() must be called on a record with an _id.');
      }
      return service.patch(this._id, this, serviceParams);
    };

    async remove(serviceParams = {}) {
      if (!this._id) {
        return new Error('Method remove() must be called on a record with an _id.')
      };
      return service.remove(this._id, serviceParams);
    };

    // Note this is analogous to the .get() method
    // but "get" is a reserved word for immutable.js record
    // This could really be named .reload() ?
    async fetch(serviceParams = {}) {
      if (!this._id) {
        return new Error('Method fetch() must be called on a record with an _id.');
      }
      return service.get(this._id, serviceParams);
    };

    // Note this is static to be called on the class, not an instance
    static async find(serviceParams = {}) {
      return service.find(serviceParams);
    };
  };

  // Add the additional methods onto the new Resource class
  if (methods) {
    Object.keys(methods).forEach(method => {
      Resource.prototype[method] = methods[method]
    });
  }

  return Resource;
};
