import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../../../core/abstract/data.servise.abstract';
import { Car, CarDocument } from '../model/car/car.model';
import { Category, CategoryDocument } from '../model/category/category.model';
import { Employee, EmployeeDocument } from '../model/employee/employee.model';
import { File, FileDocument } from '../model/file/file.model';
import { Role, RoleDocument } from '../model/role/role.model';
import { MongoGenericRepository } from './mongo.generic.repository';

@Injectable()
export class MongoDataServices implements IDataServices, OnApplicationBootstrap {

  employee: MongoGenericRepository<Employee>;

  role: MongoGenericRepository<Role>;

  file: MongoGenericRepository<File>;

  category: MongoGenericRepository<Category>;

  car: MongoGenericRepository<Car>;

  constructor(

    @InjectModel(Employee.name)
    private EmployeeRepository: Model<EmployeeDocument>,

    @InjectModel(Role.name)
    private RoleRepository: Model<RoleDocument>,

    @InjectModel(File.name)
    private FileRepository: Model<FileDocument>,

    @InjectModel(Category.name)
    private CategoryRepository: Model<CategoryDocument>,

    @InjectModel(Car.name)
    private CarRepository: Model<CarDocument>,

  ) { }

  onApplicationBootstrap() {
    this.employee = new MongoGenericRepository<Employee>(this.EmployeeRepository);
    this.role = new MongoGenericRepository<Role>(this.RoleRepository);
    this.file = new MongoGenericRepository<File>(this.FileRepository);
    this.category = new MongoGenericRepository<Category>(this.CategoryRepository);
    this.car = new MongoGenericRepository<Car>(this.CarRepository);
  }
}