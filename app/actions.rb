# Homepage (Root path)
require 'json'
require_relative './models/contact'

get '/' do
  erb :index
end

get '/api/contacts' do 
  @contacts = Contact.all
  erb @contacts.to_json, layout: false
end

get '/search/:txt' do
 Contact.where(name: params[:txt]).to_json
end

post '/contacts' do
  name = params[:name]
  email = params[:email]
  results = {result: false}


  contact = Contact.new(name: name, email: email)
  if contact.save
    results[:result] = true
    results[:id] = contact.id
    results[:name] = contact.name
    results[:email] = contact.email
  end
  results.to_json
end
