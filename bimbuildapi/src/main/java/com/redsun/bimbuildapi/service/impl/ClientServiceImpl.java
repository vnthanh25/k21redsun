

package com.redsun.bimbuildapi.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.redsun.bimbuildapi.model.Client;
import com.redsun.bimbuildapi.model.common.SearchCriteria;
import com.redsun.bimbuildapi.repository.ClientRepository;
import com.redsun.bimbuildapi.repository.specification.ClientSpecification;
import com.redsun.bimbuildapi.repository.specification.ClientSpecificationsBuilder;
import com.redsun.bimbuildapi.service.ClientService;

@Service("client")
@Transactional
public class ClientServiceImpl implements ClientService {
	
	@Autowired
	private ClientRepository clientRepository;
	
	@Autowired
	private ClientSpecificationsBuilder clientSpecificationsBuilder;

	@Override
	public Client save(Client client) {
		return clientRepository.save(client);
	}

	@Override
	public Client create(Client client) {
		return clientRepository.save(client);
	}

	@Override
	public Client update(Integer id, Client client) {
		//Client dbClient = clientRepository.findOne([Integer id]);
		//clientRepository.save(dbClient);
		return clientRepository.save(client);
	}

	@Override
	public void delete(Client client) {
		clientRepository.delete(client);
	}

	@Override
	public void deleteById(Integer id) {
		clientRepository.delete(id);
	}

	@Override
	public Client getById(Integer id) {
		return clientRepository.findOne(id);
	}

	@Override
	public List<Client> listAll() {
		return clientRepository.findAll();
	}

	@Override
	public long countAll() {
		return clientRepository.count();
	}

	@Override
	public boolean isExist(Integer id) {
		return clientRepository.exists(id);
	}
	
	public List<Client> listWithCritera(SearchCriteria searchCriteria) {
		Specification<Client> clientSpecification = new ClientSpecification(searchCriteria);
        List<Client> result = clientRepository.findAll(clientSpecification);
        return result;
	}
	
	public List<Client> listWithCriteras(List<SearchCriteria> searchCriterias) {
        Specification<Client> clientSpecification = clientSpecificationsBuilder.build(searchCriterias);
        List<Client> result = clientRepository.findAll(clientSpecification);
        return result;
	}
	
	public Page<Client> listAllByPage(Pageable pageable) {
		return clientRepository.findAll(pageable);
	}
	
	public Page<Client> listWithCriteraByPage(SearchCriteria searchCriteria, Pageable pageable) {
		Specification<Client> clientSpecification = new ClientSpecification(searchCriteria);
		Page<Client> result = clientRepository.findAll(clientSpecification, pageable);
        return result;
	}
	
	public Page<Client> listWithCriterasByPage(List<SearchCriteria> searchCriterias, Pageable pageable) {
		Specification<Client> clientSpecification = clientSpecificationsBuilder.build(searchCriterias);
		Page<Client> result = clientRepository.findAll(clientSpecification, pageable);
        return result;
	}
	
	
}
