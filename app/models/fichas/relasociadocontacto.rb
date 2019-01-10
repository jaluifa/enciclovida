class Fichas::Relasociadocontacto < ActiveRecord::Base

	self.table_name = "#{CONFIG.bases.fichasespecies}.relasociadocontacto"
	self.primary_keys = :asociadoId,  :contactoId

	belongs_to :asociado, :class_name => 'Asociado', :foreign_key => 'asociadoId'
	belongs_to :contacto, :class_name => 'Contacto', :foreign_key => 'contactoId'

end