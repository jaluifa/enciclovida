class Region < ActiveRecord::Base

  establish_connection(:catalogos)
  self.table_name = 'catalogocentralizado.Region'
  self.primary_key = 'IdRegion'

  # Los alias con las tablas de catalogos
  alias_attribute :id, :IdRegion
  alias_attribute :nombre_region, :NombreRegion
  alias_attribute :tipo_region_id, :IdTipoRegion
  alias_attribute :clave_region, :ClaveRegion
  alias_attribute :id_region_asc, :IdRegionAsc

  belongs_to :tipo_region

  scope :validas, -> { where.not(nombre_region: 'ND') }

  def self.regiones_asignadas(regiones)
    resp = {}

    regiones.each do |region|
      resp = region.asocia_regiones(resp)
    end

    resp
  end

  def asocia_regiones(resp = {})
    region = {nombre: nombre_region, reg_desc: {}}

    # Es root
    if id_region_asc == id
      resp[id] = region
    else
      # El padre ya existia
      if resp[id_region_asc].present?
        resp[id_region_asc][:reg_desc][id] = region
      else  # No necesariamente es un root
        padre = Region.find(id_region_asc)
        resp[id_region_asc] = {nombre: padre.nombre_region, reg_desc: {}}
        resp[id_region_asc][:reg_desc][id] = region
      end
    end

    resp
  end

end
