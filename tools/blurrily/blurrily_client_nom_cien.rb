#antes de correr el script crear la carpeta db/blurrily/, OJO esto solo es para ambiente de pruebas
require 'blurrily/client'
client = Blurrily::Client.new(:host => '127.0.0.1', :db_name => 'nombres_cientificos')

Especie.all.each do |taxon|
  client.put(taxon.nombre_cientifico, taxon.id)
end