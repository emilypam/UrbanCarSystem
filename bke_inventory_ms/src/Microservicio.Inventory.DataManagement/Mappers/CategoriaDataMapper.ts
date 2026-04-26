import { CategoriaEntity } from '../../Microservicio.Inventory.DataAccess/Entities/CategoriaEntity';
import { CategoriaDataModel } from '../Models/CategoriaDataModel';

export class CategoriaDataMapper {
  static toDataModel(entity: CategoriaEntity): CategoriaDataModel {
    return { categoriaId: entity.cat_id, nombre: entity.cat_nombre };
  }

  static toEntity(model: CategoriaDataModel): CategoriaEntity {
    return { cat_id: model.categoriaId, cat_nombre: model.nombre };
  }

  static toDataModelList(entities: CategoriaEntity[]): CategoriaDataModel[] {
    return entities.map((e) => CategoriaDataMapper.toDataModel(e));
  }
}
