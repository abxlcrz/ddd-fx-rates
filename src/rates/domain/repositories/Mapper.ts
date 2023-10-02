export default interface Mapper<Entity,DTO>{
    toEntity(dto: DTO): Entity;
}