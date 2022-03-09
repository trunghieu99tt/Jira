import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTask1646850743318 implements MigrationInterface {
  name = 'AlterTableTask1646850743318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\`
            ADD \`list_position\` int NOT NULL
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`tasks\` DROP COLUMN \`list_position\`
        `);
  }
}
